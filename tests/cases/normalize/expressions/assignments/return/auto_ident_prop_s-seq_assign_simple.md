# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> normalize > expressions > assignments > return > auto_ident_prop_s-seq_assign_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
function f() {
  return (a = (1, 2, b).c = 2);
}
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
function f() {
  const tmpNestedAssignObj = b;
  const tmpNestedPropAssignRhs = 2;
  tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  let tmpReturnArg = a;
  return tmpReturnArg;
}
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
function f() {
  b.c = 2;
  a = 2;
  let tmpReturnArg = a;
  return tmpReturnArg;
}
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: 2, { c: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
