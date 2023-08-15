import { useParams } from "react-router";

const Product = () => {
    const { id } = useParams();

    return (
        <div>{id}</div>
    );
}

export default Product;