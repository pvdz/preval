# Preval test case

# if-else_second.md

> Normalize > Return > If-else second
>
> Unused return statements should be eliminated

#TODO

## Input

`````js filename=intro
function f() {
  if ($(0)) return $(1);
  else return;
}

$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const tmpIfTest = $(0);
  if (tmpIfTest) {
    const tmpReturnArg = $(1);
    return tmpReturnArg;
  } else {
    return undefined;
  }
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const tmpIfTest = $(0);
  if (tmpIfTest) {
    const tmpReturnArg = $(1);
    return tmpReturnArg;
  } else {
    return undefined;
  }
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
