# Preval test case

# nested_getters_middle.md

> normalize > assignment > nested_getters_middle
>
> Trying to minimize a regression

Oh right, that's a tool I still need to write. This led to an inifite loop, temporarily.

#TODO

## Input

`````js filename=intro
const b = {
  get foo() {
  },
};
`````

## Normalized

`````js filename=intro
const b = { get foo() {} };
`````

## Output

`````js filename=intro
const b = { get foo() {} };
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same