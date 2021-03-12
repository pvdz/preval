# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> Normalize > Expressions > Statement > Param default > Auto ident delete computed s-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
function f(p = delete ($(1), $(2), arg)[$("y")]) {}
$(f());
$(a, arg);
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    $(1);
    $(2);
    const tmpDeleteCompObj = arg;
    const tmpDeleteCompProp = $('y');
    p = delete tmpDeleteCompObj[tmpDeleteCompProp];
  } else {
    p = tmpParamDefault;
  }
};
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    $(1);
    $(2);
    const tmpDeleteCompProp = $('y');
    delete arg[tmpDeleteCompProp];
  }
};
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'y'
 - 4: undefined
 - 5: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
