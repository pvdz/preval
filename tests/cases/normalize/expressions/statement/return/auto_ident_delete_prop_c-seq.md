# Preval test case

# auto_ident_delete_prop_c-seq.md

> normalize > expressions > statement > return > auto_ident_delete_prop_c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
function f() {
  return delete ($(1), $(2), $(arg)).y;
}
$(f());
$(a, arg);
`````

## Normalized

`````js filename=intro
function f() {
  $(1);
  $(2);
  const tmpDeleteObj = $(arg);
  const tmpReturnArg = delete tmpDeleteObj.y;
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
  const tmpDeleteObj = $(arg);
  const tmpReturnArg = delete tmpDeleteObj.y;
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
 - 4: true
 - 5: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
