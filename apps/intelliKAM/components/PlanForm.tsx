import React, { useState,useEffect } from 'react';
import Input from '../common/Input';
import Button, { ButtonKind, ButtonSize } from '../common/Button';
import Icon from './Icons';
import validator from 'validator';
import { safeFetch } from 'fetcher';
import useNotifications from '../hooks/useNotification';
import { useRouter } from 'next/router';
import { swr as useSWR } from 'lib';

type PlanTypes = {
  id?: string 
}

const PlanForm: React.FC<PlanTypes> = ({id}) => {
  const {data: plan} = useSWR(id ? `/api/plans/${id}` : null);
  const [form, setForm] = useState({
    name: '',
    features: [''],
    price: '',
    includedVideos: '',
  });

  useEffect(() => {
    if (plan) {
      setForm(plan)
    }
  }, [plan])

  const [errors, setErrors] = useState<any>({});
  const notifier = useNotifications();
  const router = useRouter();

  const handleInputValues = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [key]: event.target.value,
    })
  }

  const handleFeatures = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const features = [...form.features]
    features[index] = event.target.value
    setForm({
      ...form,
      features: features,
    })
  }

  const addLine = () => {
    const features = [...form.features]
    features.push('')
    setForm({
      ...form,
      features: features,
    })
  }

  const removeLine = (index: number) => {
    let features = [...form.features]
    features = features.filter((_, i) => i !== index)
    setForm({
      ...form,
      features: features,
    })
  }

  const createProduct = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setErrors({})
    if (validator.isEmpty(form.name)) {
      setErrors({
        ...errors,
        name: 'This is required field',
      })
      return
    }
    const result = await safeFetch(id ? `/api/plans/${id}` : '/api/plans/create', {
      body: form,
      method: id ? 'put' : 'post'
    })
    if (result.error) {
      notifier({
        message: "Something went wrong.",
        style: "error",
      });
      return;
    }
    notifier({
      message: "Plan created successfully",
      style: "success"
    });
    router.push("/admin/plans")
  }

  return (
    <div>
      <form className="w-full">
        <Input
          label="Name*"
          id="name"
          type="text"
          placeholder="Name here"
          value={form.name}
          onChange={(e:any) => handleInputValues('name', e)}
          error={errors?.name}
        />
        <div>
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Features List
          </label>
          {form.features.map((feature, idx) => (
            <div className="flex" key={idx}>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-sky-500"
                value={feature}
                placeholder="Feature here"
                onChange={(e) => handleFeatures(idx, e)}
              />
              <Icon
                icon="cross"
                size={15}
                className="ml-2 mt-4 cursor-pointer text-blue-400"
                onClick={() => removeLine(idx)}
              />
            </div>
          ))}
        </div>
        <div>
          <label
            className="block capitalize tracking-wide text-blue-400 text-xs font-bold mb-2 cursor-pointer"
            onClick={addLine}
          >
            <Icon icon="plus" size={10} className="mb-1 text-blue-400" /> Add
            another line
          </label>
        </div>
        <Input
          label="Included Videos"
          id="included-videos"
          type="number"
          min={0}
          placeholder="Included videos here"
          value={form.includedVideos}
          onChange={(e:any) => handleInputValues('includedVideos', e)}
        />
        <Input
          label="Price"
          id="price"
          type="number"
          min={0}
          placeholder="Price here"
          value={form.price}
          onChange={(e:any) => handleInputValues('price', e)}
        />
        <Button
          kind={ButtonKind.primaryCta}
          size={ButtonSize.medium}
          onClick={createProduct}
        >
          Create Product
        </Button>
      </form>
    </div>
  )
}

export default PlanForm;