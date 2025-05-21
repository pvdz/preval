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
let x___4__ = 1;
try /*7*/ {
  $(x___11__);
  if ($) {
    /*14*/ throw `skip`;
  } /*18*/ else {
    x___22__ = 2;
  }
} catch (e___24__) /*25*/ {
  $(x___29__);
}
$(x___33__);
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
