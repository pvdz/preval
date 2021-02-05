# Preval test case

# auto_ident_delete_computed_c-seq_complex.md

> normalize > expressions > assignments > return > auto_ident_delete_computed_c-seq_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
function f() {
  return (a = delete ($(1), $(2), $(x))[$("y")]);
}
$(f());
$(a, x);
`````

## Normalized

`````js filename=intro
function f() {
  let tmpReturnArg;
  $(1);
  $(2);
  const tmpDeleteCompObj = $(x);
  const tmpDeleteCompProp = $('y');
  const tmpNestedComplexRhs = delete tmpDeleteCompObj[tmpDeleteCompProp];
  a = tmpNestedComplexRhs;
  tmpReturnArg = tmpNestedComplexRhs;
  return tmpReturnArg;
}
let x = { y: 1 };
let a = { a: 999, b: 1000 };
('<hoisted func decl `f`>');
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
function f() {
  let tmpReturnArg;
  $(1);
  $(2);
  const tmpDeleteCompObj = $(x);
  const tmpDeleteCompProp = $('y');
  const tmpNestedComplexRhs = delete tmpDeleteCompObj[tmpDeleteCompProp];
  a = tmpNestedComplexRhs;
  tmpReturnArg = tmpNestedComplexRhs;
  return tmpReturnArg;
}
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: 'y'
 - 5: true
 - 6: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
