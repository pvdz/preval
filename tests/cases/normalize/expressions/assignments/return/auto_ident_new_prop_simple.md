# Preval test case

# auto_ident_new_prop_simple.md

> Normalize > Expressions > Assignments > Return > Auto ident new prop simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f() {
  return (a = new b.$(1));
}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpNewCallee = b.$;
  a = new tmpNewCallee(1);
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
  const tmpNewCallee = b.$;
  a = new tmpNewCallee(1);
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
 - 1: 1
 - 2: {}
 - 3: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
