# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Assignments > Param default > Auto ident delete computed simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
function f(p = (a = delete arg[$("y")])) {}
$(f());
$(a, arg);
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpDeleteCompObj = arg;
    const tmpDeleteCompProp = $('y');
    const tmpNestedComplexRhs = delete tmpDeleteCompObj[tmpDeleteCompProp];
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
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
    const tmpDeleteCompProp = $('y');
    const tmpNestedComplexRhs = delete arg[tmpDeleteCompProp];
    a = tmpNestedComplexRhs;
  }
};
const arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'y'
 - 2: undefined
 - 3: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
