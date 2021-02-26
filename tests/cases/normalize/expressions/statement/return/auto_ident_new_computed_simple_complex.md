# Preval test case

# auto_ident_new_computed_simple_complex.md

> Normalize > Expressions > Statement > Return > Auto ident new computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f() {
  return new b[$("$")](1);
}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpCompObj = b;
  const tmpCompProp = $('$');
  const tmpNewCallee = tmpCompObj[tmpCompProp];
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
  const tmpCompProp = $('$');
  const tmpNewCallee = b[tmpCompProp];
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
 - 1: '$'
 - 2: 1
 - 3: {}
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
