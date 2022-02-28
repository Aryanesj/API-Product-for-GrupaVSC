import { FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { CommentListItem } from '../types';
import styles from '../../PostList/PostListItemForm/PostListItemForm.module.scss';

interface CommentListItemFormProps {
  formTitle: string;
  initialValues: CommentListItem;
  onCancel(): void;
  onSubmit(values: CommentListItem): void;
}

const validationSchema = yup.object({
  email: yup.string().required('Email is required').email('Not Email'),
  name: yup.string().required('Name is required'),
  body: yup.string().required('Body is required'),
});

export const CommentListItemForm: FC<CommentListItemFormProps> = ({
  formTitle,
  initialValues,
  onCancel,
  onSubmit,
}) => {
  const formik = useFormik<CommentListItem>({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        noValidate
        autoComplete={'off'}
        className="d-flex flex-column gap-2"
      >
        <div className="d-flex flex-column gap-2">
          <h3 className="h3">{formTitle}</h3>
          <div>
            <label className="form-label m-0">Title</label>
            <input
              className="form-control"
              type="text"
              placeholder={'please input title'}
              {...formik.getFieldProps('email')}
            />
            {Boolean(formik.touched.email) && Boolean(formik.errors.email) ? (
              <div className="text-danger">{formik.errors.email}</div>
            ) : null}
          </div>
          <div>
            <label className="form-label m-0">Name</label>
            <input
              className="form-control"
              type="text"
              placeholder={'please input title'}
              {...formik.getFieldProps('name')}
            />
            {Boolean(formik.touched.name) && Boolean(formik.errors.name) ? (
              <div className="text-danger">{formik.errors.name}</div>
            ) : null}
          </div>
          <div>
            <label className="form-label m-0">Comment body</label>
            <textarea
              className="form-control"
              rows={5}
              placeholder={'please input title'}
              {...formik.getFieldProps('body')}
            />
            {Boolean(formik.touched.body) && Boolean(formik.errors.body) ? (
              <div className="text-danger">{formik.errors.body}</div>
            ) : null}
          </div>
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
    </div>
  );
};
