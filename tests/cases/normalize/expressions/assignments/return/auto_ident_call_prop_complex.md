# Preval test case

# auto_ident_call_prop_complex.md

> Normalize > Expressions > Assignments > Return > Auto ident call prop complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f() {
  return (a = $(b).$(1));
}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpCallObj = $(b);
  a = tmpCallObj.$(1);
  let tmpReturnArg = a;
  return tmpReturnArg;
};
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpCallObj = $(b);
  a = tmpCallObj.$(1);
  const tmpReturnArg = a;
  return tmpReturnArg;
};
const b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
