# Preval test case

# nested_getters_middle_test1.md

> Normalize > Expressions > Nested getters middle test1
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

## Pre Normal

`````js filename=intro
const b = {
  get foo() {
    debugger;
  },
};
`````

## Normalized

`````js filename=intro
const b = {
  get foo() {
    debugger;
    return undefined;
  },
};
`````

## Output

`````js filename=intro

`````

## PST Output

With rename=true

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
