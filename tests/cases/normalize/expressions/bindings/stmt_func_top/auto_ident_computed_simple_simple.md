# Preval test case

# auto_ident_computed_simple_simple.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident computed simple simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { c: 1 };

  let a = b["c"];
  $(a, b);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let b = { c: 1 };
  let a = b['c'];
  $(a, b);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let b = { c: 1 };
  let a = b.c;
  $(a, b);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const b = { c: 1 };
const a = b.c;
$(a, b);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, { c: '1' }
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
