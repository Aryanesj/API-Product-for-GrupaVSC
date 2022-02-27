import { FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { PostListItem } from '../types';
import styles from './PostListItemForm.module.scss';

interface PostListItemFormProps {
  initialValues: PostListItem;
  formTitle: string;
  onCancel(): void;
  onSubmit(values: PostListItem): void;
}

const validationSchema = yup.object({
  title: yup.string().required('Must not be empty!'),
  body: yup.string().required('Must not be empty!'),
});

export const PostListItemForm: FC<PostListItemFormProps> = ({
  initialValues,
  onCancel,
  formTitle,
  onSubmit,
}) => {
  const formik = useFormik<PostListItem>({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      noValidate
      autoComplete={'off'}
      className="d-flex flex-column gap-2"
    >
      <div>
        <h3 className="h3">{formTitle}</h3>
        <label className="form-label m-0">Title</label>
        <input
          className="form-control"
          type="text"
          placeholder={'please input title'}
          {...formik.getFieldProps('title')}
        />
        {Boolean(formik.touched.title) && Boolean(formik.errors.title) ? (
          <div className="text-danger">{formik.errors.title}</div>
        ) : null}
      </div>

      <div>
        <label className="form-label m-0">Title</label>
        <textarea
          className="form-control"
          placeholder={'please input body'}
          {...formik.getFieldProps('body')}
          rows={5}
        />
        {Boolean(formik.touched.body) && Boolean(formik.errors.body) ? (
          <div className="text-danger">{formik.errors.body}</div>
        ) : null}
      </div>

      <div className={`d-flex gap-2 ${styles.btnsWrap}`}>
        <button className="btn btn-primary w-100" type={'submit'}>
          save
        </button>
        <button
          className="btn btn-primary w-100"
          type={'button'}
          onClick={onCancel}
        >
          cancel
        </button>
      </div>
    </form>
  );
};
