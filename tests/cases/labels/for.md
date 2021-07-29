# Preval test case

# for.md

> Labels > For
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

## Pre Normal

`````js filename=intro
$(0);
dropme: {
  foo: while ($(true)) {
    {
      if (1) break foo;
      else continue foo;
    }
  }
}
$(2);
`````

## Normalized

`````js filename=intro
$(0);
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    break;
  } else {
    break;
  }
}
$(2);
`````

## Output

`````js filename=intro
$(0);
$(true);
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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
