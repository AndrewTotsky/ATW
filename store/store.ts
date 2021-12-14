import axios from 'axios';
import {action, makeObservable, observable, runInAction} from 'mobx';

export interface IPhoto {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export interface IPhotoStore {
  photos_list: IPhoto[];
  loadPhotosList: () => Promise<void>;
  errorLoadImages: {isError: boolean; text: string};
}

const BASE_URL = 'https://picsum.photos/';

class Store implements IPhotoStore {
  photos_list: IPhoto[] = [];
  errorLoadImages = {isError: false, text: ''};

  constructor() {
    makeObservable(this, {
      photos_list: observable,
      errorLoadImages: observable,
      setErrorLoad: action,
    });
  }

  loadPhotosList = async () => {
    try {
      let photos_list: IPhoto[] = await (
        await axios.get(`${BASE_URL}v2/list?limit=5`)
      ).data;

      photos_list = await this.fixImageURL(photos_list);

      runInAction(() => {
        this.photos_list = photos_list;
      });
    } catch {
      this.setErrorLoad({
        isError: true,
        text: 'Ошибка загрузки изображений. Попробуйте снова',
      });
    }
  };

  setErrorLoad = (errInfo: {isError: boolean; text: string}) => {
    this.errorLoadImages = errInfo;
  };

  fixImageURL = async (photos_list: IPhoto[]) => {
    await Promise.all(
      photos_list.map(async item => {
        const real_img_url = await (
          await axios.get(item.download_url)
        ).request.responseURL;
        item.url = real_img_url;
      }),
    );
    return photos_list;
  };
}

export const PhotoStore = new Store();
