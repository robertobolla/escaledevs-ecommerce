import { AlertOctagon, BadgeCheck, ShoppingCart } from "lucide-react";
import SkeltonProjectInfo from "./SkeltonProjectInfo";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useContext } from "react";
import { CartContext } from "@/app/_context/CartContext";

function ProjectInfo({ product }) {
  const { user } = useUser();
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);

  // Use to Add Project/Product into Cart
  const onAddToCartClick = () => {
    if (!user) {
      router.push("/sign-in");
      return;
    } else {
      const data = {
        data: {
          userName: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          products: product?.id,
        },
      };
      GlobalApi.addToCart(data).then((resp) => {
        console.log("add to cart", resp);
        if (resp) {
          setCart((cart) => [...cart, { id: resp?.id, product: product }]);
        }
      }),
        (error) => {
          console.log("Error", error);
        };
    }
  };

  // Procesar descripción a HTML
  const generateHTMLFromDescription = (description) => {
    if (!description || !Array.isArray(description)) {
      return "No description available";
    }

    const processNode = (node) => {
      if (node.bold) {
        return `<strong>${node.text}</strong>`;
      } else if (node.italic) {
        return `<em>${node.text}</em>`;
      } else if (node.underline) {
        return `<u>${node.text}</u>`;
      } else if (node.text) {
        return node.text.replace(/\n/g, "<br>"); // Reemplaza saltos de línea con <br>
      } else if (node.type === "bulleted-list") {
        const items = node.children.map(
          (child) => `<li>${child.children.map(processNode).join("")}</li>`
        );
        return `<ul>${items.join("")}</ul>`;
      } else if (node.type === "numbered-list") {
        const items = node.children.map(
          (child) => `<li>${child.children.map(processNode).join("")}</li>`
        );
        return `<ol>${items.join("")}</ol>`;
      } else if (node.type === "paragraph") {
        return `<p>${node.children.map(processNode).join("")}</p>`;
      }
      return "";
    };

    return description.map((node) => processNode(node)).join("");
  };

  // Generar HTML para la descripción
  const descriptionHTML = generateHTMLFromDescription(
    product?.attributes?.description
  );

  return (
    <div>
      {product ? (
        <div>
          <h2 className="text-[20px]">{product?.attributes?.title}</h2>
          <h2 className="text-[15px] mt-5 text-gray-700">
            {product?.attributes?.category}
          </h2>
          {/* Renderiza la descripción como HTML */}
          <div
            className="text-[15px] mt-5 text-gray-700"
            dangerouslySetInnerHTML={{ __html: descriptionHTML }}
          />

          <h2 className="text-[35px] text-primary-light font-medium">
            ${product?.attributes?.price}
          </h2>
          <button
            className="flex gap-2 p-3 px-10 mt-5
        bg-primary-light text-white rounded-lg hover:bg-primary-dark"
            onClick={() => onAddToCartClick()}
          >
            <ShoppingCart /> Add to Cart
          </button>
        </div>
      ) : (
        <SkeltonProjectInfo />
      )}
    </div>
  );
}

export default ProjectInfo;
