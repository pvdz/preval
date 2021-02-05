# Preval test case

# auto_prop_simple_simple.md

> normalize > expressions > assignments > return > auto_prop_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = { b: $(1) });
}
$(f());
a.b = 2;
$(a);
`````

## Normalized

`````js filename=intro
function f() {
  let tmpReturnArg;
  const tmpObjLitVal = $(1);
  const tmpNestedComplexRhs = { b: tmpObjLitVal };
  a = tmpNestedComplexRhs;
  tmpReturnArg = tmpNestedComplexRhs;
  return tmpReturnArg;
}
let a = { a: 999, b: 1000 };
('<hoisted func decl `f`>');
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
a.b = 2;
$(a);
`````

## Output

`````js filename=intro
function f() {
  let tmpReturnArg;
  const tmpObjLitVal = $(1);
  const tmpNestedComplexRhs = { b: tmpObjLitVal };
  a = tmpNestedComplexRhs;
  tmpReturnArg = tmpNestedComplexRhs;
  return tmpReturnArg;
}
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
a.b = 2;
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { b: '1' }
 - 3: { b: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
