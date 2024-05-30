# Preval test case

# try_loop_entry3.md

> Ref tracking > Tofix > Try loop entry3
>
> The entryReads and entryWrites for a Try must be propagated which is relevant for loops.

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  $(x);       // x=1
  while (true) {
    try {
      $(x);   // x=1 2
      x = 2;  // Does not overwrite itself because it does not loop
      break;
    } catch {
      $(x);   // x=1 2
    }
  }
  $(x);       // x=2
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
$(x___9__);
while (true) {
  /*12*/ try /*14*/ {
    $(x___18__);
    x___22__ = 2;
    break;
  } catch (e___25__) /*26*/ {
    $(x___30__);
  }
}
$(x___34__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,18,30     | none           | 22
  - r @9       | 4
  - r @18      | 4,22
  - w @22      | ########## | 18,30,34    | 4,22           | 22
  - r @30      | 4,22
  - r @34      | 22
