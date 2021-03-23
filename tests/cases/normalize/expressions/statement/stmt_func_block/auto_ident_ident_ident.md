# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Statement > Stmt func block > Auto ident ident ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = 1,
      c = 2;

    let a = { a: 999, b: 1000 };
    b = 2;
    $(a, b, c);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  {
    let b = 1,
      c = 2;
    let a = { a: 999, b: 1000 };
    b = 2;
    $(a, b, c);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let b = 1;
  let c = 2;
  let a = { a: 999, b: 1000 };
  b = 2;
  $(a, b, c);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(a, 2, 2);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, 2, 2
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
