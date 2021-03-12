# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> Normalize > Expressions > Statement > Stmt func block > Auto ident prop s-seq assign simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { c: 1 };

    let a = { a: 999, b: 1000 };
    (1, 2, b).c = 2;
    $(a, b);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  {
    let b = { c: 1 };
    let a = { a: 999, b: 1000 };
    (1, 2, b).c = 2;
    $(a, b);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let b = { c: 1 };
  let a = { a: 999, b: 1000 };
  const tmpAssignMemLhsObj = b;
  tmpAssignMemLhsObj.c = 2;
  $(a, b);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const b = { c: 1 };
  const a = { a: 999, b: 1000 };
  b.c = 2;
  $(a, b);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, { c: '2' }
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
