# Preval test case

# auto_ident_new_computed_s-seq_complex.md

> Normalize > Expressions > Statement > Param default > Auto ident new computed s-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f(p = new (1, 2, b)[$("$")](1)) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = tmpParamDefault === undefined ? new (1, 2, b)[$('$')](1) : tmpParamDefault;
};
let b = { $ };
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpCompObj = b;
    const tmpCompProp = $('$');
    const tmpNewCallee = tmpCompObj[tmpCompProp];
    p = new tmpNewCallee(1);
  } else {
    p = tmpParamDefault;
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
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
