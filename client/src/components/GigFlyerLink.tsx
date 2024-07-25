type GigFlyerLinkProps = {
  gigData: {
    id: number,
    location: string,
  },
  flyersAddress: string,
}

const GigFlyerLink = ({ gigData, flyersAddress }: GigFlyerLinkProps) => {

  const paddedId = (`${gigData.id}`).padStart(3, '0')
  const url = `${flyersAddress}/gig-${paddedId}-flyer.pdf`

  return (
    <a className='gig-flyer-link'
      href={url}
      target='_blank'
      rel='noreferrer'
      download>Get Flyer!</a>
  )
}

export default GigFlyerLink
