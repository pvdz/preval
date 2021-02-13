# Preval test case

# auto_ident_new_ident_complex_args.md

> normalize > expressions > statement > return > auto_ident_new_ident_complex_args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f() {
  return new $($(1), $(2));
}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
function f() {
  const tmpNewCallee = $;
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  const tmpReturnArg = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
  return tmpReturnArg;
}
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam$2 = f();
tmpCallCallee(tmpCalleeParam$2);
$(a);
`````

## Output

`````js filename=intro
function f() {
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  const tmpReturnArg = new $(tmpCalleeParam, tmpCalleeParam$1);
  return tmpReturnArg;
}
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCalleeParam$2 = f();
$(tmpCalleeParam$2);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: {}
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same