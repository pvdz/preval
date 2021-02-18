# Preval test case

# cond_read_before_write.md

> binding > cond_read_before_write
>
> Test case where the read of a var binding occurs before the write, even if it never does so (though preval won't be able to assert this).

We can't make x a constant.

#TODO

## Input

`````js filename=intro
var x;
{
  if ($(0)) {
    $(x, 'fail'); // never procs but preval can't discover that
  }
  x = 10;
  if ($(1)) {
    $(x);
  }
}
`````

## Normalized

`````js filename=intro
var x;
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(x, 'fail');
}
x = 10;
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
  $(x);
}
`````

## Output

`````js filename=intro
var x;
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(x, 'fail');
}
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
  $(10);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
