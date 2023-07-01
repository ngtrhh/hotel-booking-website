import React from "react";
import { useState } from "react";

export const HomeContext = () => {
	const [searchPlace, setSearchPlace] = useState('100');
	return [searchPlace, setSearchPlace];
}