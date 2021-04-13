# Preval test case

# auto_arguments_length.md

> Normalize > Expressions > Assignments > Stmt func block > Auto arguments length
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    a = arguments;
    $(a);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  const tmpArgumentsAny = arguments;
  debugger;
  {
    let a = { a: 999, b: 1000 };
    a = tmpArgumentsAny;
    $(a);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpArgumentsAny = arguments;
  debugger;
  let a = { a: 999, b: 1000 };
  a = tmpArgumentsAny;
  $(a);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpArgumentsAny = arguments;
  debugger;
  $(tmpArgumentsAny);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
