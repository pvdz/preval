# Preval test case

# base.md

> normalize > arrow > base
>
> Simple arrow case

#TODO

## Input

`````js filename=intro
const f = () => $(1);
f();
`````

## Normalized

`````js filename=intro
const f = () => {
  const tmpReturnArg = $(1);
  return tmpReturnArg;
};
f();
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
