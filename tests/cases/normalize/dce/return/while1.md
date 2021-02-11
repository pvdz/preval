# Preval test case

# base.md

> normalize > dce > base
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

#TODO

## Input

`````js filename=intro
function f() {
  while ($(true)) {
    return $(1, 'return');
  }
  $('keep, do not eval');
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  while (true) {
    const tmpIfTest = $(true);
    if (tmpIfTest) {
      const tmpReturnArg = $(1, 'return');
      return tmpReturnArg;
    } else {
      break;
    }
  }
  $('keep, do not eval');
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: true
 - 2: 1, 'return'
 - 3: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
