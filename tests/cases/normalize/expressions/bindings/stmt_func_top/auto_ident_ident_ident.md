# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident ident ident
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = 1,
    c = 2;

  let a = (b = 2);
  $(a, b, c);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let b = 1,
    c = 2;
  let a = (b = 2);
  $(a, b, c);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let b = 1;
  let c = 2;
  b = 2;
  let a = b;
  $(a, b, c);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(2, 2, 2);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2, 2, 2
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
