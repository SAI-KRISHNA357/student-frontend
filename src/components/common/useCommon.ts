import { useState } from "react";

export const useCommon = () => {
    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [className, setClassName] = useState<string>('');
    const [mobile, setMobile] = useState<string>('');
    return { name, setName, age, setAge, className, setClassName, mobile, setMobile };
}