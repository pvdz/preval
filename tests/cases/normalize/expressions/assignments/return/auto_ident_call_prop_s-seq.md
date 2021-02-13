# Preval test case

# auto_ident_call_prop_s-seq.md

> normalize > expressions > assignments > return > auto_ident_call_prop_s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f() {
  return (a = (1, 2, b).$(1));
}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
function f() {
  const tmpCallObj = b;
  a = tmpCallObj.$(1);
  let tmpReturnArg = a;
  return tmpReturnArg;
}
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
function f() {
  const tmpCallObj = b;
  a = tmpCallObj.$(1);
  let tmpReturnArg = a;
  return tmpReturnArg;
}
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same