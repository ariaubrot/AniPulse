import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from "@chakra-ui/react";
import { Form, Link } from "react-router-dom";

import footerImg from "../../assets/footer.png";
import "./style.css";

const Footer = () => {
  return (

            <Text
              as="span"
              fontSize="13.45px"
              fontWeight="300"
              lineHeight="21px"
              letterSpacing="0.5px"
              color="#d4d4d4"
              textAlign={{ base: "center", md: "start" }}
            >
              By subscribing you agree to our terms and conditions.
            </Text>
          </Box>
        </Box>
      </Box>
      <Box bg="var(--primary-background-color)" py="20px">
        <Box
          maxW={{
            base: "95%",
            xl: "85%",
            "2xl": "container.xl",
          }}
          margin="auto"
          display="flex"
          flexDir={{ base: "column", md: "row" }}
          alignItems="center"
          justifyContent={{ base: "center", md: "space-between" }}
        >
          {/* Copyright */}
          <Box>
            <Text
              as="p"
              fontSize={{ base: "12.59px", md: "15.5px" }}
              fontWeight="400"
              lineHeight={{ base: "30px", md: "24px" }}
              color="#808080"
              letterSpacing="0.5px"
            >
              &copy;
              {` ${new Date().getFullYear()} All rights reserved by AniPulse.`}
            </Text>
          </Box>

          {/* Privacy Policy */}
          <Box display="flex" gap="20px">
            <Link className="policy">Privacy Policy</Link>
            <Link className="policy">Comments Policy</Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
