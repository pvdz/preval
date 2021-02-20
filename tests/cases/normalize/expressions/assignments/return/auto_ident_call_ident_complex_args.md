# Preval test case

# auto_ident_call_ident_complex_args.md

> Normalize > Expressions > Assignments > Return > Auto ident call ident complex args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f() {
  return (a = $($(1), $(2)));
}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
function f() {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  a = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
  let tmpReturnArg = a;
  return tmpReturnArg;
}
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee$1 = $;
const tmpCalleeParam$2 = f();
tmpCallCallee$1(tmpCalleeParam$2);
$(a);
`````

## Output

`````js filename=intro
function f() {
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  a = $(tmpCalleeParam, tmpCalleeParam$1);
  const tmpReturnArg = a;
  return tmpReturnArg;
}
let a = { a: 999, b: 1000 };
const tmpCalleeParam$2 = f();
$(tmpCalleeParam$2);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 1
 - 5: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
