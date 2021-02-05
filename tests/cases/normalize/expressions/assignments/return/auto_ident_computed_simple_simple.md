# Preval test case

# auto_ident_computed_simple_simple.md

> normalize > expressions > assignments > return > auto_ident_computed_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
function f() {
  return (a = b["c"]);
}
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
function f() {
  let tmpReturnArg;
  const tmpNestedComplexRhs = b.c;
  a = tmpNestedComplexRhs;
  tmpReturnArg = tmpNestedComplexRhs;
  return tmpReturnArg;
}
let b = { c: 1 };
let a = { a: 999, b: 1000 };
('<hoisted func decl `f`>');
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
function f() {
  let tmpReturnArg;
  const tmpNestedComplexRhs = b.c;
  a = tmpNestedComplexRhs;
  tmpReturnArg = tmpNestedComplexRhs;
  return tmpReturnArg;
}
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
