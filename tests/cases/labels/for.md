# Preval test case

# labeled.md

> labels > labeled
>
> If the sub-statement of a label is a loop then it should not become a block since that would be a syntax error with labeled continue.

#TODO

## Input

`````js filename=intro
$(0);
foo: for(;$(true);) {
  if (1) break foo;
  else continue foo;
}
$(2);
`````

## Normalized

`````js filename=intro
$(0);
foo: while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    break foo;
  } else {
    break;
  }
}
$(2);
`````

## Output

`````js filename=intro
$(0);
foo: while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    break foo;
  } else {
    break;
  }
}
$(2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: true
 - 3: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
