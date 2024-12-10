import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null); // null asosan boshlang'ich qiymat uchun ishlatiladi
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchHandle = async () => {
            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error("Not found");
                const resp = await res.json();
                setData(resp);
            } catch (err) {
                setError(err.message); // Xatolikni to'g'ri formatda saqlash
            } finally {
                setLoading(false);
            }
        };

        fetchHandle();
    }, [url]);

    return { data, error, loading }; // Qaytarish formatini object qilib tuzish
};

export default useFetch;
