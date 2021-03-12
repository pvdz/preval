# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Statement > Stmt func block > Auto base assign ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = 1;

    let a = { a: 999, b: 1000 };
    b = $(2);
    $(a, b);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  {
    let b = 1;
    let a = { a: 999, b: 1000 };
    b = $(2);
    $(a, b);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let b = 1;
  let a = { a: 999, b: 1000 };
  b = $(2);
  $(a, b);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const a = { a: 999, b: 1000 };
  const SSA_b = $(2);
  $(a, SSA_b);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { a: '999', b: '1000' }, 2
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
