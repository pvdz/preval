# Preval test case

# with_global.md

> Pcode > With global
>
> It shouldn't allow to compile to pcode due to the implicit global

## Options

- pcode

## Input

`````js filename=intro
  const f = function() {
  debugger;
  const tmpBool = !x;
  return tmpBool;
};
f();
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Pcode output


`````fileintro

`````




## Pcode result


