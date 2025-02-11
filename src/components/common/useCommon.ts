import { useState } from "react";

export const useCommon = () => {
    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<number>();
    const [className, setClassName] = useState<string>('');
    const [mobile, setMobile] = useState<number>();
    return { name, setName, age, setAge, className, setClassName, mobile, setMobile };
}