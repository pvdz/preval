# Preval test case

# ident_ident_bin.md

> Normalize > Binding > Stmt-func-top > Ident ident bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
function f() {
  let  b = 2, c = 3, d = 4;
  let a = b = c + d;
  $(a, b, c);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let b = 2,
    c = 3,
    d = 4;
  let a = (b = c + d);
  $(a, b, c);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let b = 2;
  let c = 3;
  let d = 4;
  b = c + d;
  let a = b;
  $(a, b, c);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(7, 7, 3);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 7, 7, 3
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
