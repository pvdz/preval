# Preval test case

# auto_ident_delete_prop_c-seq.md

> normalize > expressions > assignments > return > auto_ident_delete_prop_c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
function f() {
  return (a = delete ($(1), $(2), $(arg)).y);
}
$(f());
$(a, x);
`````

## Normalized

`````js filename=intro
function f() {
  $(1);
  $(2);
  const tmpDeleteObj = $(arg);
  a = delete tmpDeleteObj.y;
  let tmpReturnArg = a;
  return tmpReturnArg;
}
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
function f() {
  $(1);
  $(2);
  const tmpDeleteObj = $(arg);
  a = delete tmpDeleteObj.y;
  let tmpReturnArg = a;
  return tmpReturnArg;
}
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: true
 - 5: true, undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same