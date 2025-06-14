# Preval test case

# try_break_inline.md

> Ref tracking > Tofix > Try break inline
>
> When inlining inside a trap, do we prevent the catch from being
> able to observe certain values?

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  try {
    $(x);   // x=1
    if ($) throw 'skip';
    x = 2;
  } catch {
    $(x);   // x=1 2
  }
  $(x);     // x=1 2
}
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
try /*7~22*/ {
  $(/*___11__*/ x);
  if ($) {
    /*14~17*/ throw `skip`;
  } /*18~22*/ else {
    /*___22__*/ x = 2;
  }
} catch (/*___24__*/ e) /*25~29*/ {
  $(/*___29__*/ x);
}
$(/*___33__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 11,29,33    | none           | 22
  - r @11      | 4
  - w @22      | ########## | 29,33       | 4              | none
  - r @29      | 4,22
  - r @33      | 4,22

e:
  - w @24      | ########## | not read    | none           | none
