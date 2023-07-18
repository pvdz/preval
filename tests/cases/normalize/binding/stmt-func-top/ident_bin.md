# Preval test case

# ident_bin.md

> Normalize > Binding > Stmt-func-top > Ident bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
function f() {
  let  b = 2, c = 3;
  let a = b + c;
  $(a, b, c);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let b = 2,
    c = 3;
  let a = b + c;
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
  let a = b + c;
  $(a, b, c);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(5, 2, 3);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( 5, 2, 3 );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5, 2, 3
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
