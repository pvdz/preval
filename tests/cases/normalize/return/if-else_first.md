# Preval test case

# unused.md

> normalize > return > unused
>
> Unused return statements should be eliminated

#TODO

## Input

`````js filename=intro
function f() {
  if ($(1)) return;
  else return $(2);
}

$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    return undefined;
  } else {
    const tmpReturnArg = $(2);
    return tmpReturnArg;
  }
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    return undefined;
  } else {
    const tmpReturnArg = $(2);
    return tmpReturnArg;
  }
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
