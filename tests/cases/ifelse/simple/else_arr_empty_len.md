# Preval test case

# else_arr_empty_len.md

> Ifelse > Simple > Else arr empty len
>
> Eliminate simple tautology

#TODO

## Input

`````js filename=intro
if ([].length) $(1);
else $(2);
`````

## Normalized

`````js filename=intro
const tmpCompObj = [];
const tmpIfTest = tmpCompObj.length;
if (tmpIfTest) {
  $(1);
} else {
  $(2);
}
`````

## Output

`````js filename=intro
const tmpCompObj = [];
const tmpIfTest = tmpCompObj.length;
if (tmpIfTest) {
  $(1);
} else {
  $(2);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
