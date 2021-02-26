# Preval test case

# auto_ident_new_computed_s-seq_simple.md

> Normalize > Expressions > Statement > Return > Auto ident new computed s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f() {
  return new (1, 2, b)["$"](1);
}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpCompObj = b;
  const tmpNewCallee = tmpCompObj.$;
  const tmpReturnArg = new tmpNewCallee(1);
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
  const tmpReturnArg = new tmpNewCallee(1);
  return tmpReturnArg;
};
const b = { $: $ };
const a = { a: 999, b: 1000 };
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
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
