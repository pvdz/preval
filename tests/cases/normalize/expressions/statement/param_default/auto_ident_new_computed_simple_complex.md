# Preval test case

# auto_ident_new_computed_simple_complex.md

> Normalize > Expressions > Statement > Param default > Auto ident new computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f(p = new b[$("$")](1)) {}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function ($tdz$__pattern) {
  let p = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    const tmpCompObj = b;
    const tmpCompProp = $('$');
    const tmpNewCallee = tmpCompObj[tmpCompProp];
    p = new tmpNewCallee(1);
  } else {
    p = $tdz$__pattern;
  }
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
const f = function ($tdz$__pattern) {
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    const tmpCompProp = $('$');
    const tmpNewCallee = b[tmpCompProp];
    new tmpNewCallee(1);
  }
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
 - 3: undefined
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
