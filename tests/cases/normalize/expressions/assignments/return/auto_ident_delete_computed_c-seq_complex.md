# Preval test case

# auto_ident_delete_computed_c-seq_complex.md

> normalize > expressions > assignments > return > auto_ident_delete_computed_c-seq_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
function f() {
  return (a = delete ($(1), $(2), $(arg))[$("y")]);
}
$(f());
$(a, arg);
`````

## Normalized

`````js filename=intro
function f() {
  $(1);
  $(2);
  const tmpDeleteCompObj = $(arg);
  const tmpDeleteCompProp = $('y');
  a = delete tmpDeleteCompObj[tmpDeleteCompProp];
  let tmpReturnArg = a;
  return tmpReturnArg;
}
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
function f() {
  $(1);
  $(2);
  const tmpDeleteCompObj = $(arg);
  const tmpDeleteCompProp = $('y');
  a = delete tmpDeleteCompObj[tmpDeleteCompProp];
  let tmpReturnArg = a;
  return tmpReturnArg;
}
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, arg);
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