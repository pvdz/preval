# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  a = "foo";
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let a = { a: 999, b: 1000 };
  a = 'foo';
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let a = { a: 999, b: 1000 };
  a = 'foo';
  $(a);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$('foo');
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
