# Preval test case

# computed.md

> normalize > object > computed
>
> Computed keys

#TODO

## Input

`````js filename=intro
const obj = {
  [$(1)]: $(2),
};
$(obj);
`````

## Normalized

`````js filename=intro
var tmpComputedKey;
tmpComputedKey = $(1);
const obj = { [tmpComputedKey]: $(2) };
$(obj);
`````

## Output

`````js filename=intro
var tmpComputedKey;
tmpComputedKey = $(1);
const obj = { [tmpComputedKey]: $(2) };
$(obj);
`````
